const base_url="http://"+window.location.hostname+":8080"
//const base_url="https://data.birnbaua.at"
export const properties = {
    process_entries_base_url: base_url + "/driver",
    qr_code_base_url: base_url + "/code/qrcode",
    booking: base_url + "/booking",
    driver: base_url + "/driver",
    post_booking: base_url + "/booking"
};