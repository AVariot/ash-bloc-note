use crate::tools::read_file::read_file;

#[tauri::command]
pub fn load_file(path: String) -> Result<String, String> {
    read_file(path).map_err(|e| e.to_string())
}
