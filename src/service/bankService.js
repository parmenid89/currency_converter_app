class BankService {
    _apiBase = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json' ;

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error (`Could not fetch ${this._apiBase}`);
        }

        return await res.json();
    }

    
    getAllCourses = async () => {
        const res = await this.getResource(this._apiBase);
        return res.filter(item => this._neededCourses(item));
    }

    _neededCourses = (item) => {
        if (item.cc === 'GBP' || item.cc === 'USD' || item.cc === 'EUR') {
            return {}
        }
    }
}

export default BankService;