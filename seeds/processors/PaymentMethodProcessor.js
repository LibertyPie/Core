const PaymentMethodsDataArray = require("../files/factory_add_payment_method");
const ethers = require("ethers");
//var slugify = require('slugify');
const Utils = require("../../classes/Utils");
const Status = require("../../classes/Status");
const slugify = require('slugify')

var pmCatsDataArray = null;
var paymentMethodsByCatIdObj = {}

module.exports = async ({
    contractName,
    contractInstance, 
    contractMethod, 
    argsArray,
    networkId,
    web3,
    web3Account
}) => {
  
    try {

        //.getPaymentMethodCategories().call()
        console.log(   await contractInstance.methods.getPaymentMethods().call() )

        return false;

        //payment Method Categories 
        let pmCatsStatus = await getPaymentMethodCategories(contractInstance);

        console.log("pmCatsStatus ====>>> ", pmCatsStatus)

        return pmCatsStatus

        if(pmCatsStatus.isError()){
            return pmCatsStatus;
        }

        pmCatsDataArray = pmCatsStatus.data;

        let totalCatsAdded = 0;
        let totalPmAdded = 0;
        let totalPmFailed = 0
            
        for(let index in argsArray){

            let pmDataInfo = argsArray[index];

            //yarn seeder-run

            let categoryName = (pmDataInfo.category || "")
            let isCategoryEnabled = (pmDataInfo.isEnabled || true)

            let chainCategoryId;

            Utils.infoMsg(`Processing Category: ${categoryName}`)

            console.log('')

            Utils.infoMsg(`Checking if category '${categoryName}' exists`)

            //lets get cat info by name
            let chainCatInfoStatus = await getCategoryInfoByName(categoryName)

            if(chainCatInfoStatus.isError()){
                Utils.errorMsg(`Failed to get category Info for '${categoryName}'`)
                return chainCatInfoStatus;
            }

            let chainCatInfo = chainCatInfoStatus.data || [];

            //if empty data, then lets insert the data
            if(!(chainCatInfo == null || chainCatInfo.length == 0) && chainCatInfo.id > 0){
                
                chainCategoryId = parseInt(chainCatInfo.id);

                Utils.infoMsg(`Category ${categoryName} exists with id: ${chainCategoryId}`)
            } else {
                
                Utils.infoMsg(`Category ${categoryName} does not exists adding to chain`)

                 let addPaymentCategoryResult = await contractInstance.methods.addPaymentMethodCategory(categoryName, isCategoryEnabled)
                                                        .send({from: web3Account});


                if(!addPaymentCategoryResult.status){
                    Utils.errorMsg(`Failed to add category: '${categoryName}', txHash: ${addPaymentCategoryResult.transactionHash}`)
                    continue
                }


                chainCategoryId = addPaymentCategoryResult.events.AddPaymentMethodCategory.returnValues[0];

                chainCategoryId = parseInt(chainCategoryId);
                
                //at this point, lets add category
               Utils.successMsg(`Category name '${categoryName}' added, id: ${chainCategoryId} , txHash: ${addPaymentCategoryResult.transactionHash}`)

               //lets add to this list pmCatsDataArray
               pmCatsDataArray[chainCategoryId] = {id: chainCategoryId, name: categoryName};

               totalCatsAdded += 1
            }            

            //paymentGatewayDefaultOpts
            let pmDefaultOpts = pmDataInfo.defaultOptions || null;

            //lets get category children
            let categoryChildrenArray = (pmDataInfo.children || [])

            let pmDataByCatIdArray = await getPaymentMethodsByCategoryId(contractInstance, chainCategoryId)

            //lets now loop the children 
            for(let ci in categoryChildrenArray) {

                let paymentMethodInfo = categoryChildrenArray[ci];

                if(typeof paymentMethodInfo == 'string'){

                    if(pmDefaultOpts == null){
                        throw new Error(`Category defaultOptions parameter is required if a child is a string at category ${categoryName}, child ${paymentMethodInfo}`)
                    }

                    pmDefaultOpts['name'] = paymentMethodInfo;
                    paymentMethodInfo = pmDefaultOpts;
                } //end if 

                //console.log("paymentMethodInfo ==> ", paymentMethodInfo)

                //lets get the payment metho info by name
                let chainPaymentMethodInfoStatus = await getPaymentMethodInfoByName(contractInstance,chainCategoryId,paymentMethodInfo.name);

                let chainPaymentMethodInfo = chainPaymentMethodInfoStatus.data || null;

                //console.log(`chainPaymentMethodInfo - ${categoryName} ==>> `, chainPaymentMethodInfoStatus)

                //continue;

                //field is empty, lets add data
                if(!(chainPaymentMethodInfo == null || chainPaymentMethodInfo.length == 0)){
                    
                    Utils.successMsg(`PaymentMethod ${categoryName} -> ${paymentMethodInfo.name} id: ${paymentMethodInfo.id} already exist, skipping `)

                } else {
                    
                    Utils.infoMsg(`PaymentMethod ${paymentMethodInfo.name} does not exist, adding it`)

                    let dataParam = [
                        paymentMethodInfo.name,
                        chainCategoryId,
                        paymentMethodInfo.minPaymentWindow,
                        paymentMethodInfo.maxPaymentWindow,
                        paymentMethodInfo.countries,
                        paymentMethodInfo.continents,
                        paymentMethodInfo.isEnabled
                    ];

                    console.log("pm dataParam ==>> ", dataParam)

                    //lets insert the data 
                    let insertPmDataResults = await contractInstance.methods.addPaymentMethod(
                        paymentMethodInfo.name,
                        chainCategoryId,
                        paymentMethodInfo.minPaymentWindow,
                        paymentMethodInfo.maxPaymentWindow,
                        paymentMethodInfo.countries ||[],
                        paymentMethodInfo.continents || [],
                        paymentMethodInfo.isEnabled || true
                    ).send({from: web3Account})

                    //console.log(`${categoryName} ==>>`, insertPmDataResults)

                    if(!insertPmDataResults.status){
                        Utils.errorMsg(`Adding paymentMethod ${paymentMethodInfo.name} failed, txHash: ${insertPmDataResults.transactionHash}`)
                        continue;
                    }

                    let paymentMethodId = insertPmDataResults.events.AddPaymentMethod.returnValues[0];

                    totalPmAdded += 1

                    Utils.successMsg(`PaymentMethod ${paymentMethodInfo.name} added successfully, id: ${paymentMethodId}, txHash: ${insertPmDataResults.transactionHash}`)
                } //end 

            }//end loop
        }//end loop
        
        return Status.successPromise("",{"Total Payment Gateway Added": totalPmAdded, "Total Categories Added": totalCatsAdded})
    } catch (e) {
        Utils.errorMsg(`seedPaymentMethodsData Error: ${e}`)
        console.log(e)

         return Status.errorPromise("",null)
    }
    
}

//lets check if category exists 
getPaymentMethodCategories = async (contractInstance) => {
    try {

        console.log("Booooooommmmm =====>>>>>>>")
        
        //console.log(contractInstance)
        //lets check if the category slug exists
        let resultsArray = await contractInstance.methods.getPaymentMethodsCategories().call();

        console.log("Booooooommmmm =====>>>>>>>",resultsArray)

        //lets process the results 
        let processedResults = []

        for(let i in resultsArray){

            let catInfo = resultsArray[i]

            if(catInfo.id == 0 || catInfo.name == ""){
                continue;
            }

            processedResults.push(catInfo)
        }

        return Status.successPromise("",processedResults)
    } catch (e) {
        console.log(`getPaymentMethodCategories Error ${e.message}`,e)
        return Status.errorPromise(`getPaymentMethodCategories Error: ${e.message}`)
    }
}

//get cat info by name
getCategoryInfoByName = async (categoryName) => {

    if(pmCatsDataArray == null){
          //payment Method Categories 
        let pmCatsStatus = await getPaymentMethodCategories(contractInstance);

        if(pmCatsStatus.isError()){
            Utils.errorMsg(pmCatsStatus.msg)
            return pmCatsStatus;
        }

        pmCatsDataArray = pmCatsStatus.data;
    } //end if 

    let catNameSlug = slugify(categoryName)

    for(let catInfo of pmCatsDataArray){

        if(!catInfo) continue;

        let chainCatName = catInfo.name || "";

        if(chainCatName.length == 0) continue;
        
        chainCatName = slugify(catInfo.name);

        if(chainCatName.length > 0 && chainCatName == catNameSlug){
            return Status.successPromise("", catInfo)
        }
    } //end lop

    return Status.successPromise("", null);
} //end fun 


/**
 * getPaymentMethodInfo
 */
 getPaymentMethodsByCategoryId = async (contractInstance, categoryId) => {
    try {

        if(categoryId in paymentMethodsByCatIdObj){
           return  Status.successPromise("",paymentMethodsByCatIdObj[categoryId])
        }

        //lets check if the category slug exists
        let resultsData = await contractInstance.methods.getPaymentMethodsByCategory(categoryId).call();

        //console.log(`${categoryId} ===>>> `, resultsData)

        let processedData = []

        for(let pmInfo of resultsData) {
            
            if(pmInfo.id == 0 || pmInfo.name == "") continue;

            processedData.push(pmInfo)
        }

        paymentMethodsByCatIdObj[categoryId] = processedData;

        return Status.successPromise("",processedData)

    } catch (e) {
        console.log(`getPaymentMethodsByCategoryId Error ${e.message}`,e)
        return Status.errorPromise(`getPaymentMethodsByCategoryId Error: ${e.message}`)
    }
 }

 /**
  * getPaymentMethodByName
  */
getPaymentMethodInfoByName = async (contractInstance, categoryId, paymentMethodName) => {

    //lets get payment methods by catId
    let paymentMethodsByCatIds = await getPaymentMethodsByCategoryId(contractInstance, categoryId);

    //console.log(paymentMethodsByCatIds)

    if(paymentMethodsByCatIds.isError()){
        return paymentMethodsByCatIds;
    }

    let paymentMethodNameSlug = slugify(paymentMethodName)

    let dataArray = paymentMethodsByCatIds.data || []

    paymentMethodName = paymentMethodName.trim();

    for(let pmInfo of dataArray){

        if(pmInfo.id <= 0 || (pmInfo.name || "").length == 0) continue;

        if(paymentMethodNameSlug == slugify(pmInfo.name)){
            return Status.successPromise("",pmInfo)
        }
    } //end loop 

    return Status.successPromise("", null);
} //end un 