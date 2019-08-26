class Client {
    constructor(name, city, passport) {
        this.name = name;
        this.passport = passport;
        this.postCompany = null;
        this.receivedParcels = [];
    }
    registerAt(postCompany) {
        this.postCompany = postCompany;
        console.log(`${this.name} registered at ${postCompany.name} office!`)
    }
    set parcel(parcel) {
        if (!this._parcel || this._parcel && !Object.isSealed(this._parcel)) {
            this._parcel = parcel;
            console.log(`${this.name} created a parcel with:`);
            for (let [key, value] of Object.entries(parcel)) {
                console.log(`${key}: ${value}`);
            }
        } else {
            console.log(`Parcel already packed, you can't change it!`);
        }       
    }
    get parcel() {
        return this._parcel;
    }
    packParcel() {
        Object.seal(this._parcel);
        console.log(`${this.name} packed a parcel!`);
    }
    sendParcelTo(passport) {
        this.postCompany.send(this, passport, this._parcel);
        delete this._parcel;
    }
    receiveParcel(from, parcel) {
        this.receivedParcels.push(parcel);
        console.log(`${this.name} have received parcel from ${from.name}`);
    }
}

class PostCompany {
    constructor(name) {
        this.name = name;
        this.clients = [];
    }
    register(client) {
        this.clients.push(client);
        client.registerAt(this);
    }
    send(from, to, parcel) {
        let receiver = this.clients.find(client => client.passport === to);
        receiver.receiveParcel(from, parcel);
    }
}

const postCompany = new PostCompany('Russian Post');
const andrei = new Client('Andrei', 100);
const anna = new Client('Anna', 102);

postCompany.register(andrei);
console.log('--------------------');
postCompany.register(anna);
console.log('--------------------');
postCompany.register(semen);
console.log('--------------------');

andrei.parcel = {
    'jem': '2 kg',
    'letter': '1 pcs',
    'book': '4 pcs'
}
console.log('--------------------');
andrei.packParcel();
console.log('--------------------');
andrei.parcel = {
    'jem': '2 kg'
}
console.log('--------------------');
andrei.sendParcelTo(102);
console.log(anna.receivedParcels);
console.log(andrei.parcel);