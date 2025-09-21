mod base64;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn transform_input(input: &str, transform_type: &str) -> String {
    match transform_type {
        "base64Encode" => base64::get_encode(input),
        "base64Decode" => base64::get_decode(input),
        _ => format!("Transformed {input} for {transform_type}"),
    }
}

#[tauri::command]
fn get_output(input: &str, output_type: &str) -> String {
    match output_type {
        "getStringLength" => format!("{} characters!", input.chars().count()),
        _ => format!("Throw some kind of error here"), // TODO
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![transform_input, get_output])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
