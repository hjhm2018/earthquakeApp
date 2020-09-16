import React, { Component } from 'react'


export class Earthquake extends Component {

    state = {
        startDate: "",
        endDate: "",
        minMagnitude: "",
        maxMagnitude: "",
        countries: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
        country: "",
        earthquakeData: []
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.value);
    };

    onClick() {
        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson`).then(response => {
            response
                .json()
                .then(data => {
                    if (data) {
                        this.setState({
                            earthquakeData: data
                        });
                    }
                    console.log(data);
                })
                .catch(error => {
                    console.log(`there is an error ${error}`);
                });
        });
    }

    render() {
        const magnitudes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        console.log(this.state.earthquakeData);
        return (
            <div>
                <input name="startDate" onChange={this.onChange} type="date" />
                <br />
                <input name="endDate" onChange={this.onChange} type="date" />
                <br />
                <select onChange={this.onChange} name="minMagnitude">
                    <option>Min. Magnitude</option>
                    {magnitudes.map((magnitude, index) => {
                        return <option key={index} value={magnitude}>{magnitude}</option>
                    })}
                </select>
                <br />
                <select onChange={this.onChange} name="maxMagnitude">
                    <option>Max. Magnitude</option>
                    {magnitudes.map((magnitude, index) => {
                        return <option key={index} value={magnitude}>{magnitude}</option>
                    })}
                </select>
                <br />
                <select onChange={this.onChange} name="country">
                    <option>Select a country</option>
                    {this.state.countries.map((country, index) => {
                        return <option key={index} value={country}>{country}</option>
                    })}
                </select>

                <br />

                <button onClick={this.onClick}>Search</button>

            </div>
        )
    }
}

export default Earthquake
