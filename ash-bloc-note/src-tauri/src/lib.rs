
pub mod explorateur;
pub mod tools;
pub mod save_file;
pub mod load_file;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            explorateur::explorateur,
            save_file::save_file,
            load_file::load_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
