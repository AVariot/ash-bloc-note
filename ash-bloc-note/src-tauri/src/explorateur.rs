
use crate::tools::open_dir::open_dir;

#[tauri::command]
pub fn explorateur(path: String) -> Result<Vec<String>, String> {
    open_dir(path)
}
