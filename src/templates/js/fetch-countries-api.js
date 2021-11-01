export default function fetchCountries(e) {
    const form=document.querySelector("input")
    const searchQuery = e.target.value;

    const url = `https://restcountries.com/v2/name/${searchQuery}`;
    return fetch(url)
        .then(
            response =>
                response.json())
        .then(
            data => data)
        .catch(error => {

            alert("dcsbhjbvdjfkzb ")
        })
        .finally(
        form.reset
    )
}

