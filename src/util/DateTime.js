const formatDateEuro = function formatDateEuro(str) {
    var date = new Date(str)
    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDay()

    if(month < 10) month = "0" + month
    if(day < 10) day = "0" + day

    return day + "." + month + "." + year
}

export default formatDateEuro;