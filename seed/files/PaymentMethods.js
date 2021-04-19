/*
* LibertyPie Project (https://libertypie.com)
* @author https://github.com/libertypie (hello@libertypie.com)
* @license SPDX-License-Identifier: MIT
*/

const Utils = require("../../classes/Utils");
const dataProcessor = require("../processors/PMProcessor");

module.exports = {

    contract: "Factory",
    method: "",
    processor: dataProcessor,

    data: [
        {
            name: "Bank Transfers",
            isEnabled: true,

            children: [
                {
                    name: "Bank Transfer",
                    countries: [],
                    continents: [],
                    minPaymentWindow: Utils.fromMinutesToMilli(30), 
                    maxPaymentWindow: Utils.fromDaysToMilli(1), 
                    isEnabled: true
                },

                {
                    name: "SEPA",
                    countries: [],
                    continents: ["EU"],
                    minPaymentWindow: Utils.fromDaysToMilli(1),
                    maxPaymentWindow: Utils.fromDaysToMilli(5),
                    isEnabled: true
                },

                {
                    name: "UPI Transfer",
                    countries: ["IN"],
                    continents: [],
                    isEnabled: true,
                    minPaymentWindow: Utils.fromMinutesToMilli(15),
                    maxPaymentWindow: Utils.fromHoursToMilli(3),
                },

                {
                    name: "NEFT Transfer",
                    countries: ["IN"],
                    continents: [],
                    minPaymentWindow: Utils.fromDaysToMilli(1),
                    maxPaymentWindow: Utils.fromDaysToMilli(5),
                    isEnabled: true
                },

                {
                    name: "IMPS Transfer",
                    countries: ["IN"],
                    continents: [],
                    minPaymentWindow: Utils.fromMinutesToMilli(15),
                    maxPaymentWindow: Utils.fromHoursToMilli(3),
                    isEnabled: true
                },

                {
                    name: "Domestic Wire Transfer",
                    countries: [],
                    continents: [],
                    minPaymentWindow: Utils.fromMinutesToMilli(30), 
                    maxPaymentWindow: Utils.fromDaysToMilli(1), 
                    isEnabled: true
                },

                {
                    name: "International Wire Transfer (SWIFT)",
                    countries: [],
                    continents: [],
                    minPaymentWindow:  Utils.fromDaysToMilli(3), 
                    maxPaymentWindow:   Utils.fromDaysToMilli(10), 
                    isEnabled: true
                },

                {
                    name: "PayID",
                    countries: ["AU"],
                    continents: [],
                    minPaymentWindow:  Utils.fromDaysToMilli(1), 
                    maxPaymentWindow:   Utils.fromDaysToMilli(3), 
                    isEnabled: true
                },

                {
                    name: "Interac Online",
                    countries: [],
                    continents: [],
                    minPaymentWindow:  Utils.fromDaysToMilli(1), 
                    maxPaymentWindow:   Utils.fromDaysToMilli(10), 
                    isEnabled: true
                },

                {
                    name: "Faster Payment System (FPS)",
                    countries: ["HK"],
                    continents: [],
                    minPaymentWindow:  Utils.fromMinutesToMilli(15), 
                    maxPaymentWindow:   Utils.fromHoursToMilli(1), 
                    isEnabled: true
                },

            ]
        },

        {
            name: "Online Transfers",
            isEnabled: true,

            defaultOptions: {
                countries: [],
                continents: [],
                minPaymentWindow:  Utils.fromMinutesToMilli(15), 
                maxPaymentWindow:   Utils.fromMinutesToMilli(30), 
                isEnabled: true
            },
            
            children: [
                "Abra",
                "AdvCash",
                "Airline Tickets",
                "AirPay",
                "Airtel Money",
                "AirTM",
                "Apple Pay",
                "AstroPay Direct",
                "AZA Finance",
                "Barter From Flutterwave",
                "Bhim",
                "BitLipa",
                "Bitsika",
                "Bitwallet",
                "BKash E-Wallet",
                "Bnext",
                "Bunq Transfer",
                "Capital One 360 P2P",
                "Carbon",
                "Cashapp",
                "CashU",
                "Cellulant",
                "Chase QuickPay",
                "Chime Instant Transfer",
                "ChimpChange Mobile Banking",
                "Chipper Cash",
                "CIB Smart Wallet",
                "Circle Pay",
                "Current Pay",
                "DotPay Wallet",
                "E-zwitch",
                "Easypaisa",
                "eCheck",
                "EcoPay",
                "ecoPayz",
                "ePay",
                "Equitel Mobile Money",
                "Esewa",
                "Etisalat Cash",
                "Eversend",
                "ExpressPay",
                "Facebook Messenger Payment",
                "FasaPay Online Payment",
                "FlashPay Netspend",
                "FNB E-Wallet",
                "Freecharge",
                "GCash",
                "Getcarbon",
                "Gobank Money Transfer",
                "Google Pay",
                "Grab Pay",
                "GönderAL",
                "Hello Paisa",
                "Hilton HHonors Points",
                "Hubtel",
                "ICard",
                "Interac e-Transfer",
                "JazzCash",
                "JioMoney",
                "KakaoPay",
                "Kurepay",
                "Line Pay",
                "LiqPay",
                "M-Pesa",
                "mCash Mobile Payment",
                "Mercado Pago",
                "MobiKwik Wallet",
                "Mobile Recharge",
                "Mobile Pay",
                "Mobivi",
                "Moca",
                "MoMo",
                "Movii",
                "myPayVN",
                "MTN Mobile Money",
                "Mukuru",
                "N26",
                "NBE Phone cash",
                "Neteller",
                "NganLuong",
                "OkPay",
                "Ononpay",
                "Orange Money",
                "Other Online Wallets",
                "Oxigen Wallet",
                "Ozow",
                "Paga Wallet",
                "Pago Fácil",
                "Payeer",
                "PayM",
                "PayMaya Wallet",
                "PayMe",
                "Payoo",
                "Paypal",
                "Paypower",
                "Paysend.com",
                "Paysera Money Transfer",
                "PaySon",
                "Paytm Online Wallet",
                "PayU Wallet",
                "Payza",
                "PayZapp",
                "Perfect Money",
                "Pesalink",
                "PhonePe",
                "Piggyvest",
                "PIM",
                "Pingit",
                "Plus Girot",
                "Pockit - Paypoint",
                "Pokerstars",
                "Popmoney",
                "Przelewy24",
                "Qiwi",
                "QNB Smart Wallet",
                "QQ Pay",
                "Quickteller",
                "Rapipago",
                "Revolut",
                "Safaricom Bonga Points",
                "SimbaPay",
                "Simple Bank App",
                "Skrill",
                "SlydePay Wallet",
                "Sofi Money Instant Transfer",
                "Sofort",
                "Solid Trust Pay",
                "Spektra",
                "Square up",
                "Straight Talk Reload",
                "Stripe",
                "Swish",
                "T-kash",
                "Tarjeta PAGO24",
                "Tarjeta Prex",
                "Tarjeta UALA",
                "Tele2",
                "Tigo Pesa",
                "Tigo Cash",
                "Tikkie",
                "Toss Wallet",
                "Tpaga",
                "TrueMoney",
                "UGO Pay",
                "Uhuru",
                "Union Pay (App)",
                "Uphold",
                "VBank",
                "Veem",
                "Venmo",
                "ViaBuy Card2Card Transfer",
                "ViettelPay",
                "VoguePay",
                "Vodafone Cash",
                "Wapipay",
                "Wave Mobile Wallet",
                "WebMoney",
                "WeChat Pay",
                "Wells Fargo Sure Pay",
                "Xago",
                "Yono",
                "YooMoney",
                "ZaloPay",
                "Zelle Pay"
            ]
        },

        {
            name: "Cash Payments / Remittance",
            isEnabled: true,

            defaultOptions: {
                countries: [],
                continents: [],
                minPaymentWindow:  Utils.fromDaysToMilli(1), 
                maxPaymentWindow:   Utils.fromDaysToMilli(5), 
                isEnabled: true
            },

            children: [
                "Amazon Cash",
                "Bancolombia Cash Deposit",
                "Bitcoin ATM",
                "Cardless Cash",
                "Cash by Mail",
                "Cashier's Check",
                "Check",
                "EZRemit",
                "MoneyGram",
                "OXXO",
                "Postal Money Order",
                "RIA Money Transfer",
                "Transfasr",
                "Xpress Money Service",
                "Opal Transfer",
                "Monese Online Transfer",
                "Rapid Transfer",
                "Remita",
                "Remitly",
                "Rocket Remit",
                "Sendwave Wallet",
                "Wise (Transferwise)",
                "Western Union",
                "Xoom Money Transfer (Bank)",
                "Cash Deposit to Bank",
                "Cash in Person"
            ]   
        },
        {
            name: "Gift Cards",
            isEnabled: true,

            defaultOptions: {
                countries: [],
                continents: [],
                minPaymentWindow:  Utils.fromMinutesToMilli(15), 
                maxPaymentWindow:   Utils.fromMinutesToMilli(30), 
                isEnabled: true
            },

            children: [
                "Addidas Gift Card",
                "AirBnb Gift Card",
                "Amazon Gift Card",
                "Amazon Wishlist",
                "AMC Theaters Gift Card",
                "American Apparel Gift Card",
                "American Express Gift Card",
                "Apple Gift Card (US Only)",
                "Apple Store Gift Card",
                "Applebee's Restaurant Gift Card",
                "Asos Gift Card",
                "AT&T Gift Card",
                "Barnes & Noble Gift Card",
                "Bed Bath & Beyond Gift Card",
                "Best Buy Gift Card",
                "Bitrefill Balance Card",
                "Blizzard Gift Card",
                "Booking.com Gift Card",
                "Boost Mobile",
                "Cabela's E-Gift Code",
                "Calvin Klein Gift Card",
                "CASHlib Vouchers",
                "Chilli's Restaurant Gift Card",
                "China Telecom Card",
                "Coles Gift Card",
                "Colourpop Gift Card",
                "Costco Cash Card",
                "Cracker Barrel Gift Card",
                "CVS Gift Card",
                "Dell Gift Card",
                "Delta Airline Gift Card",
                "DENT",
                "Disney Gift Card",
                "DMM Gift Card",
                "Domino's Pizza Gift Card",
                "DoorDash Gift Card",
                "Dunkin' Donuts Gift Card",
                "Eastbay Gift Card",
                "eBay Gift Card",
                "eGifter.com Code",
                "Etsy",
                "Everlane Gift Card",
                "Fandango Gift Card",
                "Finish Line Gift Card",
                "Flexepin Gift Card",
                "Flipkart e-Gift Voucher",
                "G2A Gift Card",
                "Footlocker Sports Gift Card",
                "Forever 21 Gift Card",
                "Fresh Direct Gift Card",
                "G2A Gift Card",
                "GameStop Gift Card",
                "Other Gift Cards",
                "Google Play Gift Card",
                "Giftcards.nl Redeem Choice Card",
                "Groupon Gift Card",
                "Grubhub Gift Card",
                "H&M Gift card",
                "Happy Card Gift Card",
                "Home Depot Gift Card",
                "Hotels.com Gift Card",
                "HULU Gift Card",
                "Hyat eGift Card",
                "IHOP Gift Card",
                "IKEA Gift Card",
                "iTunes Gift Card",
                "Jason's Deli Gift Card",
                "JCPenny Gift Card",
                "JD.com Gift Card",
                "Kohls Store Gift Card",
                "Lowe's Gift Card",
                "Lyft Gift Card",
                "Macy's Gift Card",
                "Mastercard Gift Card",
                "Microsoft Gift Card",
                "MoneyPak",
                "Myer Gift Card",
                "Neosurf Gift Card",
                "Netflix Gift Card",
                "Nintendo e-Shop Gift Card",
                "Newegg Gift Card",
                "Nike Gift Card",
                "Nordstrom Gift card",
                "Offgamers.com Gift Card",
                "Office Depo Gift Card",
                "Old Navy E-Gift Card",
                "Olive Garden Restaurant Gift Card",
                "OneVanilla Visa/MasterCard Gift Card",
                "Papa Johns Gift Card",
                "PCS Prepaid Cash Services",
                "Pizza Hut Gift Card",
                "PlayStion Network Gift Card",
                "Quiksilver Gift Card",
                "Razor Gold Gift Card",
                "Reebook Gift Card",
                "Reloadit by Netspend",
                "Restaurant Gift Card (Various Retailers)",
                "Riot Point League of Legends",
                "Roblox Game Card",
                "Safeway Gift Card",
                "Saks Fifth Avenue Gift Card",
                "Sears Gift Card",
                "Sephora Gift Card",
                "Skype Credits",
                "Southwest Airlines Gift Card",
                "Spotify Gift Card",
                "Staples Gift Card",
                "Starbucks Gift Card",
                "Steam Wallet Gift Card",
                "Subway Gift Card",
                "T-Mobile Refill",
                "Target Gift Card",
                "Target Visa Gift Card",
                "Ticket Premium Gift Card",
                "TicketMaster Gift Card",
                "Twitch Gift Card",
                "Uber Gift Card",
                "Ulta Gift Card",
                "United Airlines Gift Card",
                "Victorial's Secret Gift Card",
                "VISA Card Gift Card",
                "Walmart China Gift Card",
                "Walmart Gift Card",
                "Walmart Visa Gift Card",
                "Whole Foods Market Gift Card",
                "Xbox Gift Card",
                "Zappos Gift Card"
            ]
        },
        {
            name: "Debit/Credit Cards",
            isEnabled: true,

            defaultOptions: {
                countries: [],
                continents: [],
                minPaymentWindow:  Utils.fromMinutesToMilli(15), 
                maxPaymentWindow:   Utils.fromMinutesToMilli(30), 
                isEnabled: true
            },

            children: [
                "AccountNow Prepaid Card",
                "Akimbo",
                "American Express Card",
                "ANY Credit/Debit Card",
                "Bluebird American Express",
                "Card.com Transfer",
                "Discover Credit Card",
                "GreenDot Card",
                "Kroger Recharge Card",
                "Kroger to Kroger Prepaid Card",
                "Mango Card2Card",
                "MyVanilla Prepaid Card",
                "PaySafe Card",
                "PostePay",
                "Prepay Debit Card",
                "Virtual Visa Card",
                "Virtual Master Card",
                "Virtual Card (Others)",
                "READYdebit Card",
                "RushCard Prepaid Visa",
                "Serve to Serve",
                "Visa Debit/Debit Card",
                "Walmart Money Card"
            ]

        },
        {
            name: "Cryptocurrencies",
            isEnabled: true,

            defaultOptions: {
                countries: [],
                continents: [],
                minPaymentWindow:  Utils.fromMinutesToMilli(15), 
                maxPaymentWindow:   Utils.fromHoursToMilli(24), 
                isEnabled: true
            },

            children: [
                "Bitcoin BTC",
                "Ethereum ETH",
                "LibertyPie XPIE",
                "Binance Coin BNB",
                "Cake",
                "USDT",
                "USDC",
                "BUSD",
                "NGNT",
                "Dogecoin DOGE"
            ]

        },

        {
            name: "Goods & Services",
            isEnabled: true,

            defaultOptions: {
                countries: [],
                continents: [],
                minPaymentWindow:  Utils.fromDaysToMilli(1), 
                maxPaymentWindow:   Utils.fromDaysToMilli(10), 
                isEnabled: true
            },

            children: [
                "Car",
                "House",
                "Game Item",
                "Gadget / Electronic",
                "Gold",
                "Silver",
                "Palladium",
                "Diamond"
            ]
        }
    ]
}