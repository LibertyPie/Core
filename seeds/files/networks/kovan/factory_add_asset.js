/**
 * LibertyPie (https://libertypie.com)
 * @author LibertyPie <hello@libertypie.com>
 * factory_add_asset.js
 */
module.exports = {
    contract: 'Factory',
    method:   'addAsset',
    data: [
        
        [
            "0x4391129a31574D4E64933a5C463aE78a643D0e1d", //usdt contractAddress
            false, //isPegged
            "0x0", // peggedAssetGateway
            "USDT Tether", //originalName
            "USDT", //originalSymbol
            "chainlink", //priceFeedProvider
            "0x2ca5A90D34cA333661083F89D831f757A9A50148",
            true // isEnabled
        ],

        // Bitcoin [renBTC]
        [
            "0x0A9ADD98C076448CBcFAcf5E457DA12ddbEF4A8f", //contractAddress
            true, //isPegged
            "0x55363c0dBf97Ff9C0e31dAfe0fC99d3e9ce50b8A", // peggedAssetGateway
            "Bitcoin", //originalName
            "BTC", //originalSymbol
            "chainlink", //priceFeedProvider
            "0x6135b13325bfC4B00278B4abC5e20bbce2D6580e",//price feed contract
            true // isEnabled
        ]
    ]
}