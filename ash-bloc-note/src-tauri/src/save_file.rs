
use crate::tools::write_file::write_file;

#[tauri::command]
pub fn save_file(path: String, content: String) -> bool {
    let is_writted = write_file(path, content);
    match is_writted {
        Ok(()) => true,
        Err(e) => {
            eprintln!("Erreur écriture: {e}");
            false
        }
    }
}
