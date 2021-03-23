pragma solidity >= 0.8.0;


library RegistrationUtility{
     function luhnCheck(string memory nin) public view returns(bool){
        bytes memory nin_bytes = bytes(nin);
        uint nDigits = nin_bytes.length;
        uint sum = uint8(nin_bytes[nDigits-1]) - 48; //minus 48 to set number character correctly in ASCII chop off the first 48 characters of ASCII

        uint parity = nDigits % 2;

        for(uint8 i = 0; i < nDigits-1; i++){
            uint digit = uint8(nin_bytes[i]) - 48; //minus 48 to set number character correctly in ASCII chop off the first 48 characters of ASCII
            if(i % 2 == parity) {
                digit*=2; //digit = digit * 2;
            }
            if(digit > 9){
                digit-=9; //digit = digit - 9;
            }
            sum += digit; //sum
        }
        return (sum % 10) == 0;

    }

}