use base64::prelude::*;

pub fn get_encode(input: &str) -> String {
    BASE64_STANDARD.encode(input)
}
pub fn get_decode(input: &str) -> String {
    String::from_utf8(BASE64_STANDARD.decode(input).unwrap()).unwrap()
}
