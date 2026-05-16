use std::fs;

pub fn open_dir(path: String) -> Result<Vec<String>, String> {
    let resolved = if path == "~" || path.starts_with("~/") {
        let home = std::env::var("HOME").map_err(|_| "HOME non défini".to_string())?;
        path.replacen("~", &home, 1)
    } else {
        path.clone()
    };

    let entries = fs::read_dir(&resolved)
        .map_err(|e| format!("Erreur ouverture '{}': {}", resolved, e))?;

    let names = entries
        .filter_map(|entry| {
            entry.ok()?.file_name().into_string().ok()
        })
        .collect();

    Ok(names)
}
