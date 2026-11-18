import http.server
import socketserver
import webbrowser
import os
import sys
import json
import base64

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and disable cache during development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/save-template-file':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                post_body = self.rfile.read(content_length)
                payload = json.loads(post_body.decode('utf-8'))

                folder = payload.get('folder', 'templates')
                file_name = payload.get('fileName', 'template.docx')
                base64_data = payload.get('base64Data', '')
                doc_id = payload.get('docId', '')
                workflow_id = payload.get('workflowId', '')

                # Sanitize folder path
                clean_folder = os.path.normpath(folder).lstrip('\\/')
                target_dir = os.path.join(DIRECTORY, clean_folder)
                os.makedirs(target_dir, exist_ok=True)

                # Sanitize file name
                clean_name = os.path.basename(file_name)
                if not clean_name.endswith('.docx'):
                    clean_name += '.docx'
                target_file = os.path.join(target_dir, clean_name)

                # Decode base64 and save to physical hard drive
                if ',' in base64_data:
                    base64_data = base64_data.split(',', 1)[1]
                binary_data = base64.b64decode(base64_data)

                with open(target_file, 'wb') as f:
                    f.write(binary_data)

                # Update matrix_procurement.json if doc_id provided
                relative_file_path = f"{clean_folder}/{clean_name}".replace('\\', '/')
                matrix_file = os.path.join(DIRECTORY, 'matrix_procurement.json')
                if os.path.exists(matrix_file) and doc_id:
                    try:
                        with open(matrix_file, 'r', encoding='utf-8') as mf:
                            matrix_data = json.load(mf)
                        updated = False
                        for pt in matrix_data.get('procurementTypes', []):
                            for ph in pt.get('phases', []):
                                for doc in ph.get('documents', []):
                                    if doc.get('id') == doc_id:
                                        doc['templateFile'] = relative_file_path
                                        updated = True
                        if updated:
                            with open(matrix_file, 'w', encoding='utf-8') as mf:
                                json.dump(matrix_data, mf, ensure_ascii=False, indent=2)
                    except Exception as me:
                        print("Warning: could not update matrix_procurement.json:", me)

                response = {
                    'success': True,
                    'message': f'Đã lưu thành công vào ổ đĩa: {relative_file_path}',
                    'filePath': relative_file_path,
                    'fileName': clean_name,
                    'fileSize': len(binary_data)
                }

                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                err_resp = {'success': False, 'error': str(e)}
                self.wfile.write(json.dumps(err_resp, ensure_ascii=False).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

    def guess_type(self, path):
        # Ensure correct MIME types for Word and Excel files
        if path.endswith('.docx'):
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        if path.endswith('.xlsx'):
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        return super().guess_type(path)

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), CustomHTTPHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("  TỰ ĐỘNG XUẤT HỒ SƠ CHỈ ĐỊNH THẦU — HO SO TU DONG")
        print(f"  Server đang chạy tại: {url}")
        print("  Đang mở trình duyệt tự động...")
        print("  Nhấn Ctrl+C để dừng server.")
        print("=" * 60)
        
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nĐã dừng server.")
            sys.exit(0)

if __name__ == "__main__":
    run()
