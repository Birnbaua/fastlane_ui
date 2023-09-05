const formatDateEuro = function formatDateEuro(str) {
    return str.substring(8,10) + "." + str.substring(5,7) + "." + str.substring(0,4)
}

export default formatDateEuro;