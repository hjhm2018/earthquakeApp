import React, { Component } from 'react';

export class Earthquake extends Component {

    state = {
        startDate: "",
        endDate: "",
        minMagnitude: "",
        maxMagnitude: "",
        countries: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
        country: "",
        earthquakeData: [],
        show: false
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        // console.log(e.target.value);
    };

    onClick() {
        fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${this.state.startDate}&endtime=${this.state.endDate}&minmagnitude=${this.state.minMagnitude}&maxmagnitude=${this.state.maxMagnitude}`).then(response => {
            response
                .json()
                .then(data => {
                    if (data) {
                        this.setState({
                            earthquakeData: data
                        });
                    }
                    // console.log(data.features.length);
                })
                .catch(error => {
                    console.log(`there is an error ${error}`);
                });
        });

        this.setState({
            show: true
        });

    }

    render() {
        const magnitudes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        // if (this.state.show && this.state.earthquakeData) {
        //     console.log(this.state.earthquakeData.features);
        // }

        return (
            <div className="container-fluid text-center pt-md-4 pt-sm-1">
                <h1 className="p-4 font-weight-bolder"><span role="img" aria-label="Planet Earth emoji">&#127758;</span> Earthquake Counter <span role="img" aria-label="Notebook emoji">&#128221;</span></h1>
                <label className="p-2" htmlFor="startDate">From: &nbsp;
                    <input className="text-center" name="startDate" onChange={this.onChange} type="date" />
                </label>

                <label className="p-2" htmlFor="endDate">To: &nbsp;
                    <input className="text-center" name="endDate" onChange={this.onChange} type="date" />
                </label>

                <label className="p-2" htmlFor="minMagnitude"> Min. Magnitude: &nbsp;
                    <select onChange={this.onChange} name="minMagnitude">
                        <option>Min. Magnitude</option>
                        {magnitudes.map((magnitude, index) => {
                            return <option key={index} value={magnitude}>{magnitude}</option>
                        })}
                    </select>
                </label>
                <label className="p-2" htmlFor="maxMagnitude">Max. Magnitude: &nbsp;
                    <select onChange={this.onChange} name="maxMagnitude">
                        <option>Max. Magnitude</option>
                        {magnitudes.map((magnitude, index) => {
                            return <option key={index} value={magnitude}>{magnitude}</option>
                        })}
                    </select>
                </label>

                <label className="p-2" htmlFor="country">Country: &nbsp;
                    <select onChange={this.onChange} name="country">
                        <option>Select a country</option>
                        {this.state.countries.map((country, index) => {
                            return <option key={index} value={country}>{country}</option>
                        })}
                    </select>
                </label>

                <br />

                <button className="btn btn-primary p-2" onClick={() => this.onClick()}>Search</button>

                <table className="table table-bordered table-dark text-center col-sm-8 rounded mx-auto mt-4 mb-5 pb-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Location</th>
                            <th scope="col">Magnitude</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.show && this.state.earthquakeData.features ? this.state.earthquakeData.features.filter(data =>
                            data.properties.place.includes(this.state.country)
                        )
                            .map((earthquake, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{earthquake.properties.place}</td>
                                    <td>{earthquake.properties.mag && earthquake.properties.mag.toFixed(2)}</td>
                                    <td>{new Date(earthquake.properties.time).toLocaleDateString()}</td>
                                </tr>
                            )) : <tr><td colSpan="8">No data</td></tr>}
                    </tbody>
                </table>

                {/* {this.state.show && this.state.earthquakeData.features ? this.state.earthquakeData.features.filter(data =>
                    data.properties.place.includes(this.state.country)
                    && data.properties.mag <= this.state.maxMagnitude &&
                    data.properties.mag >= this.state.minMagnitude &&
                    new Date(data.properties.time).toLocaleDateString() >= this.state.startDate &&
                    new Date(data.properties.time).toLocaleDateString() <= this.state.endDate
                )
                    .map((earthquake, index) => (
                        <div key={index}>
                            <p>{index + 1}</p>
                            <p>{earthquake.properties.place}</p>
                            <p>{earthquake.properties.mag && earthquake.properties.mag.toFixed(2)}</p>
                            <p>{new Date(earthquake.properties.time).toLocaleDateString()}</p>
                            <p>{console.log(new Date(earthquake.properties.time).toLocaleDateString() >= this.state.startDate)}</p>
                            <p>{console.log(new Date(earthquake.properties.time).toLocaleDateString() < this.state.endDate)}</p>
                        </div>
                    )) : <p>Enter some data</p>} */}

            </div>
        )
    }
}

export default Earthquake
