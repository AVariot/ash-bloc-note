
use std::fs::File;
use std::io::prelude::*;

// Faire une fonction qui check si le fichier existe, savoir si
// il y a deja du contenu et ensuite ecrire

pub fn write_file(path: String, content: String) -> std::io::Result<()> {
    let mut file = File::create(path)?;
    file.write_all(content.as_bytes())
}
