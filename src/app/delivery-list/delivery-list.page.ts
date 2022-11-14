import { Component, NgZone, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.page.html',
  styleUrls: ['./delivery-list.page.scss'],
})

export class DeliveryListPage implements OnInit {

  displayPageNumbers: Array<number> = [];
  currentPage: number = 1;
  totalPages: number = 1;
  kidsListToDisplay = [];



  maxSmallScreenWidth: number = 780 //A tentative number based on average of mobile devices in use in landscape mode,
  currentWindowWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(null); //An observable for current stable window width
  isBigScreen: boolean = true;

  constructor(public ngZone: NgZone) {
    this.setScreenWidth();
  }

  ngOnInit() {
    this.getPageNumbersSize();
  }

  setScreenWidth() {
    let width = window.innerWidth;
    this.currentWindowWidth$.next(width);

    if (width > this.maxSmallScreenWidth) {
      this.ngZone.run(() => (
        this.isBigScreen = true
      ));
    }
    else {
      this.ngZone.run(() => (
        this.isBigScreen = false
      ));
    }

    window.onresize = () => {
      width = window.innerWidth;

      if (width > this.maxSmallScreenWidth) {
        this.ngZone.run(() => (
          this.isBigScreen = true
        ));
      }
      else {
        this.ngZone.run(() => (
          this.isBigScreen = false
        ));
      }
    };
    console.log(this.isBigScreen)
  };

  getPageNumbersSize() {
    this.totalPages = 0;
    this.displayPageNumbers = [];
    let _kidsListForDelivery = [];
    let recordsPerPage = this.isBigScreen ? 10 : 10;

    if (!this.isBigScreen) {
      _kidsListForDelivery = JSON.parse(JSON.stringify(this.kidsListForDelivery.filter((kids) => { return kids.isElligible == true })));
    }
    else {
      _kidsListForDelivery = JSON.parse(JSON.stringify(this.kidsListForDelivery));
    }

    let _pages = _kidsListForDelivery.length / recordsPerPage;
    let _pagesInteger = Math.trunc(_pages);


    if ((_kidsListForDelivery.length % recordsPerPage) > 0) {
      this.totalPages = _pagesInteger + 1;
    }
    else {
      this.totalPages = _pagesInteger;
    }

    this.generatePageNumberArray();
  };

  generatePageNumberArray() {
    this.displayPageNumbers = [];

    for (let i = 1; i <= this.totalPages; i++) {
      this.displayPageNumbers.push(i);
    }

    this.getRecordsForPageNumber();
  };

  getRecordsForPageNumber() {
    let _kidsListToDisplay = [];

    if (!this.isBigScreen) {
      _kidsListToDisplay = JSON.parse(JSON.stringify(this.kidsListForDelivery.filter((kids) => { return kids.isElligible == true })));
    }
    else {
      _kidsListToDisplay = JSON.parse(JSON.stringify(this.kidsListForDelivery));
    }

    this.kidsListToDisplay = [];
    if (this.currentPage == 1) {
      let _startNumber = 0;
      let _endNumber = 0;

      _endNumber = (this.currentPage * 10);

      this.kidsListToDisplay = _kidsListToDisplay.splice(_startNumber, _endNumber);
    }

    if (this.currentPage > 1) {
      let _startNumber = (this.currentPage * 10) - 10;
      let _endNumber = 0;

      if (this.currentPage != this.totalPages) {
        _endNumber = 10;
      }

      if (this.currentPage == this.totalPages) {
        _endNumber = (_kidsListToDisplay.length - _startNumber);
      }

      this.kidsListToDisplay = _kidsListToDisplay.splice(_startNumber, _endNumber);
    }
  };

  insertPreviousPageNumber() {
    if (this.currentPage > 1) {
      if ((this.displayPageNumbers[0]) > 1) {
        this.displayPageNumbers.unshift((this.displayPageNumbers[0]) - 1)
        this.displayPageNumbers.pop();
      }
      this.currentPage = this.currentPage - 1
    }

    this.getRecordsForPageNumber()
  };

  insertNextPageNumber() {
    if (this.currentPage >= 1 && this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1
    }

    if (this.displayPageNumbers[this.displayPageNumbers.length - 1] < this.totalPages) {
      this.displayPageNumbers.push((this.displayPageNumbers[this.displayPageNumbers.length - 1]) + 1)
      this.displayPageNumbers.shift();
    }

    this.getRecordsForPageNumber()
  };

  setCurrentPage(_newPageNumber: number) {
    this.currentPage = _newPageNumber;
    this.getRecordsForPageNumber();
  };



  kidsListForDelivery = [
    {
      "_id": "636f38d14f3ae7b1b4dcc3e5",
      "isElligible": true,
      "firstName": "Jayne",
      "lastName": "Lowery",
      "address": "Kentucky",
      "wishes": "Pen"
    },
    {
      "_id": "636f38d1df2325f94c195fb2",
      "isElligible": true,
      "firstName": "Faulkner",
      "lastName": "Wallace",
      "address": "Ohio",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d112cc3c103fef8943",
      "isElligible": true,
      "firstName": "Kelley",
      "lastName": "Mcbride",
      "address": "Maine",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d1bf55d1548fc15e4c",
      "isElligible": false,
      "firstName": "Andrea",
      "lastName": "Allen",
      "address": "Kansas",
      "wishes": "Teddy Bear"
    },
    {
      "_id": "636f38d196428e3f49890a42",
      "isElligible": true,
      "firstName": "Margie",
      "lastName": "Martinez",
      "address": "Minnesota",
      "wishes": "Books"
    },
    {
      "_id": "636f38d1ba1a462f1adb7b02",
      "isElligible": false,
      "firstName": "Tracy",
      "lastName": "Clemons",
      "address": "New York",
      "wishes": "Teddy Bear"
    },
    {
      "_id": "636f38d167db4c0cc995afa9",
      "isElligible": false,
      "firstName": "Navarro",
      "lastName": "Gibbs",
      "address": "District Of Columbia",
      "wishes": "Pen"
    },
    {
      "_id": "636f38d1205071b832a29a2f",
      "isElligible": false,
      "firstName": "Lloyd",
      "lastName": "Hamilton",
      "address": "New Jersey",
      "wishes": "Tea Set"
    },
    {
      "_id": "636f38d1a7efcf193973faab",
      "isElligible": true,
      "firstName": "Abbott",
      "lastName": "Wade",
      "address": "North Dakota",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d1d1457fe2ed4cdbc9",
      "isElligible": false,
      "firstName": "Hahn",
      "lastName": "Wilkinson",
      "address": "Colorado",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d182e8df599af5c16e",
      "isElligible": true,
      "firstName": "Jenkins",
      "lastName": "Snyder",
      "address": "Puerto Rico",
      "wishes": "Knife"
    },
    {
      "_id": "636f38d1f9558ac8a06b17dc",
      "isElligible": false,
      "firstName": "Corrine",
      "lastName": "Torres",
      "address": "American Samoa",
      "wishes": "Books"
    },
    {
      "_id": "636f38d15020d5f41bf454aa",
      "isElligible": true,
      "firstName": "Juarez",
      "lastName": "Walsh",
      "address": "Guam",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d1444655ced405f76d",
      "isElligible": true,
      "firstName": "Watts",
      "lastName": "Dixon",
      "address": "Illinois",
      "wishes": "Tea Set"
    },
    {
      "_id": "636f38d1cc71706d637b4fd7",
      "isElligible": false,
      "firstName": "Tammi",
      "lastName": "Gross",
      "address": "Tennessee",
      "wishes": "Teddy Bear"
    },
    {
      "_id": "636f38d1f5407cb4b2759db9",
      "isElligible": true,
      "firstName": "Lane",
      "lastName": "Brooks",
      "address": "North Carolina",
      "wishes": "Books"
    },
    {
      "_id": "636f38d14ed45cf1ad65482e",
      "isElligible": true,
      "firstName": "Hinton",
      "lastName": "Cline",
      "address": "Alabama",
      "wishes": "Pen"
    },
    {
      "_id": "636f38d18e509c5b349c7480",
      "isElligible": true,
      "firstName": "Nunez",
      "lastName": "Herring",
      "address": "West Virginia",
      "wishes": "Books"
    },
    {
      "_id": "636f38d10c1cd35744a8d6fc",
      "isElligible": false,
      "firstName": "Jeanine",
      "lastName": "Leonard",
      "address": "Arkansas",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d167933d83a368101c",
      "isElligible": true,
      "firstName": "Raquel",
      "lastName": "Flowers",
      "address": "Delaware",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d1d2896009ceb41598",
      "isElligible": true,
      "firstName": "Casandra",
      "lastName": "Lloyd",
      "address": "Idaho",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d118f4b49ee3d76af1",
      "isElligible": false,
      "firstName": "Priscilla",
      "lastName": "Johnson",
      "address": "Micronesia",
      "wishes": "Tea Set"
    },
    {
      "_id": "636f38d1590db16b7bd5bc44",
      "isElligible": true,
      "firstName": "Lynn",
      "lastName": "Delgado",
      "address": "Arizona",
      "wishes": "Books"
    },
    {
      "_id": "636f38d1bcc0a1acc903b31b",
      "isElligible": false,
      "firstName": "Joyce",
      "lastName": "Buchanan",
      "address": "Georgia",
      "wishes": "Teddy Bear"
    },
    {
      "_id": "636f38d10b47dbbba96b39c5",
      "isElligible": true,
      "firstName": "Miller",
      "lastName": "Long",
      "address": "Indiana",
      "wishes": "Books"
    },
    {
      "_id": "636f38d1146efc6ffed33a9f",
      "isElligible": false,
      "firstName": "Simmons",
      "lastName": "Stafford",
      "address": "Mississippi",
      "wishes": "Pen"
    },
    {
      "_id": "636f38d1eea189991ef48850",
      "isElligible": true,
      "firstName": "Lamb",
      "lastName": "Weber",
      "address": "Maryland",
      "wishes": "Knife"
    },
    {
      "_id": "636f38d1337b1ef477bb9552",
      "isElligible": false,
      "firstName": "Jeannine",
      "lastName": "Nicholson",
      "address": "Louisiana",
      "wishes": "Pen"
    },
    {
      "_id": "636f38d16b7925382b58fca9",
      "isElligible": true,
      "firstName": "Yang",
      "lastName": "Foreman",
      "address": "Nebraska",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d1625ce4a1c01d1142",
      "isElligible": true,
      "firstName": "Richmond",
      "lastName": "Puckett",
      "address": "Virgin Islands",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d1d6fac1a4227ccfeb",
      "isElligible": false,
      "firstName": "Levy",
      "lastName": "Kent",
      "address": "Marshall Islands",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d1e4cf53f2176aae56",
      "isElligible": false,
      "firstName": "Small",
      "lastName": "Moon",
      "address": "New Hampshire",
      "wishes": "Tea Set"
    },
    {
      "_id": "636f38d18829fc3f8701ebc0",
      "isElligible": true,
      "firstName": "Terri",
      "lastName": "Mason",
      "address": "Virginia",
      "wishes": "Tea Set"
    },
    {
      "_id": "636f38d143e7821a26f3f0e0",
      "isElligible": false,
      "firstName": "Kerr",
      "lastName": "Frye",
      "address": "Connecticut",
      "wishes": "Knife"
    },
    {
      "_id": "636f38d14d03e77572e14c0e",
      "isElligible": false,
      "firstName": "Kari",
      "lastName": "Matthews",
      "address": "Wyoming",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d12ca7bffbd5428f4e",
      "isElligible": false,
      "firstName": "Kramer",
      "lastName": "Mullins",
      "address": "Mariana",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d1434ff31f792e2a21",
      "isElligible": false,
      "firstName": "Lambert",
      "lastName": "Bullock",
      "address": "South Carolina",
      "wishes": "Teddy Bear"
    },
    {
      "_id": "636f38d1f3df60d50a1c3d07",
      "isElligible": true,
      "firstName": "Rice",
      "lastName": "Brady",
      "address": "Hawaii",
      "wishes": "Teddy Bear"
    },
    {
      "_id": "636f38d19cf9698009017d29",
      "isElligible": true,
      "firstName": "Harris",
      "lastName": "Logan",
      "address": "Washington",
      "wishes": "Pen"
    },
    {
      "_id": "636f38d1df83606c29d50287",
      "isElligible": true,
      "firstName": "Ryan",
      "lastName": "Mays",
      "address": "Montana",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d1807e4b67a6af0c26",
      "isElligible": false,
      "firstName": "Wyatt",
      "lastName": "Goodman",
      "address": "Oklahoma",
      "wishes": "Teddy Bear"
    },
    {
      "_id": "636f38d1c8681b3be32c778f",
      "isElligible": false,
      "firstName": "Mathis",
      "lastName": "Salinas",
      "address": "Iowa",
      "wishes": "Knife"
    },
    {
      "_id": "636f38d105de9389b4fb7916",
      "isElligible": true,
      "firstName": "Kelsey",
      "lastName": "Cleveland",
      "address": "Nevada",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d10266b48841a15f37",
      "isElligible": false,
      "firstName": "Geraldine",
      "lastName": "Blackburn",
      "address": "Michigan",
      "wishes": "Tea Set"
    },
    {
      "_id": "636f38d1be07a691a7bad817",
      "isElligible": true,
      "firstName": "Edith",
      "lastName": "Duke",
      "address": "Rhode Island",
      "wishes": "Tea Set"
    },
    {
      "_id": "636f38d18a4bb6f1c1e0962e",
      "isElligible": true,
      "firstName": "Sandra",
      "lastName": "Tucker",
      "address": "Pennsylvania",
      "wishes": "Baseball Set"
    },
    {
      "_id": "636f38d1901979ce9479ef92",
      "isElligible": false,
      "firstName": "Donna",
      "lastName": "Knight",
      "address": "Utah",
      "wishes": "Dress"
    },
    {
      "_id": "636f38d129fb3789fae36ba4",
      "isElligible": true,
      "firstName": "Keith",
      "lastName": "Clark",
      "address": "New Mexico",
      "wishes": "Knife"
    },
    {
      "_id": "636f38d122ac37d56d6ed561",
      "isElligible": true,
      "firstName": "Sasha",
      "lastName": "Fulton",
      "address": "Oregon",
      "wishes": "Knife"
    },
    {
      "_id": "636f38d17d8c0b74704afda1",
      "isElligible": false,
      "firstName": "Ester",
      "lastName": "Hewitt",
      "address": "Wisconsin",
      "wishes": "Teddy Bear"
    }
    
  ]

}
