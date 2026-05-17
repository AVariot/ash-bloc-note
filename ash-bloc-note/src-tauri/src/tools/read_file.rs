use std::fs::File;
use std::io::prelude::*;

pub fn read_file(path: String) -> std::io::Result<String> {
    let mut file = File::open(path)?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;

    Ok(content)
}
