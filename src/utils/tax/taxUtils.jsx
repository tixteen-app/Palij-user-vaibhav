export const calculateTax = (total, pincode) => {
    if (!pincode) {
        return {
            cgst: 0,
            sgst: 0,
            igst: 0,
            totalTax: 0,
            updatedTotal: total,
        };
    }
    console.log("2====",total)

    const trimmedPincode = String(pincode).trim();

    if (trimmedPincode.startsWith('45')) {
        const cgstAmount = total * 0.09;
        const sgstAmount = total * 0.09;
        const totalTax = cgstAmount + sgstAmount;
        const updatedTotal = total + totalTax;
        return {
            cgst: cgstAmount,
            sgst: sgstAmount,
            igst: 0,
            totalTax,
            updatedTotal,
        };
    } else {
        const igstAmount = total * 0.18;
        const totalTax = igstAmount;
        const updatedTotal = total + totalTax;
        // console.log("updatedTotal----",total)

        return {
            cgst: 0,
            sgst: 0,
            igst: igstAmount,
            totalTax,
            updatedTotal,
        };
    }
};