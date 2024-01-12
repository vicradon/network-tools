document.addEventListener("DOMContentLoaded", main);

const getIPClass = (ipAddress) => {
  const firstOctet = ipAddress.split(".")[0];
  if (firstOctet >= 0 && firstOctet <= 127) {
    return "A";
  } else if (firstOctet >= 128 && firstOctet <= 191) {
    return "B";
  } else if (firstOctet >= 192 && firstOctet <= 223) {
    return "C";
  } else if (firstOctet >= 224 && firstOctet <= 239) {
    return "D";
  } else if (firstOctet >= 240 && firstOctet <= 255) {
    return "E";
  } else {
    return null;
  }
};

const getSubnetMask = (ipClass) => {
  if (ipClass === "A") {
    return ["255.0.0.0", "11111111.00000000.00000000.00000000"];
  } else if (ipClass === "B") {
    return ["255.255.0.0", "11111111.11111111.00000000.00000000"];
  } else if (ipClass === "C") {
    return ["255.255.255.0", "11111111.11111111.11111111.00000000"];
  } else if (ipClass === "D") {
    return ["255.255.255.255", "11111111.11111111.11111111.11111111"];
  } else {
    return null;
  }
};

const isValidIPV4Address = (ipAddress) => {
  if (typeof ipAddress !== "string") {
    return false;
  }

  const octets = ipAddress
    .split(".")
    .filter((octet) => octet.length)
    .filter((octet) => octet[0] !== "0")
    .map((octet) => Number(octet));

  return (
    octets.length === 4 &&
    octets.every(
      (octet) => octet >= 0 && octet <= 255 && Number.isInteger(octet)
    )
  );
};

const getOctetFromIP = (ipAddress, octetPosition) => {
  if (octetPosition > 4 || octetPosition < 1) return null;

  return ipAddress.split(".")[octetPosition];
};

function main() {
  const $ = (element) => document.querySelector(element);

  $("#subnetRangeAndMaskForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const ipAddress = event.target["case2IPAddressInput"].value;
    const numberOfHosts = Number(
      event.target["numberOfHostsRequiredInput"].value
    );

    if (!isValidIPV4Address) {
      alert("Invalid IP Address!");
      return;
    }

    if (!Number.isInteger(numberOfHosts)) {
      alert("Invalid number of hosts");
      return;
    }

    // console.log(
    //   numberOfHosts,
    //   numberOfHosts.toString(2),
    //   numberOfHosts.toString(2).length
    // );
    const numberOfReservedBits = numberOfHosts.toString(2).length;

    const ipClass = getIPClass(ipAddress);
    const [, binarySubnetMask] = getSubnetMask(ipClass);

    const modifiedSubnetMaskArr = binarySubnetMask.split("");
    let leftPtr = binarySubnetMask.length - 1;
    let convertedBitCount = 0;

    while (leftPtr >= 0) {
      if (convertedBitCount < numberOfReservedBits) {
        if (modifiedSubnetMaskArr[leftPtr] != ".") {
          modifiedSubnetMaskArr[leftPtr] = 0;
          convertedBitCount += 1;
        }
      } else {
        if (modifiedSubnetMaskArr[leftPtr] != ".") {
          modifiedSubnetMaskArr[leftPtr] = 1;
        }
      }

      leftPtr -= 1;
    }

    console.log(modifiedSubnetMaskArr.join(""));

    const newSubnetMask = modifiedSubnetMaskArr.join("");

    const octetPosition = Math.ceil((32 - numberOfReservedBits) / 8);
    const concernedOctet = getOctetFromIP(newSubnetMask, octetPosition - 1);
    const subnetGenerator = 2 ** (8 - concernedOctet.indexOf(0));

    const numericIPAddress = ipAddress.split(".").map((octet) => Number(octet));
    const ipRanges = [];

    if (ipClass === "A") {
      numericIPAddress[1] = 0;
      numericIPAddress[2] = 0;
      numericIPAddress[3] = 0;
    } else if (ipClass === "B") {
      numericIPAddress[2] = 0;
      numericIPAddress[3] = 0;
    } else if (ipClass === "C") {
      numericIPAddress[3] = 0;
    }

    let rangeIndex = 0;

    while (rangeIndex < 255) {
      const newRange = [numericIPAddress.join(".")];
      numericIPAddress[octetPosition - 1] += subnetGenerator;
      newRange.push(numericIPAddress.join("."));

      ipRanges.push(newRange);
      rangeIndex += subnetGenerator;
    }

    console.log(ipRanges);
  });
}

const getLastIPAddressOfRange = (startIP, nextRangeStartIP, octetPosition) => {
  if (!isValidIPV4Address(startIP) || !isValidIPV4Address(nextRangeStartIP))
    return null;
  const startIPArr = startIP.split(".").map((a) => Number(a));

  // for (let i = 3; i >= 0; i--){
  //     if
  // }
};

`
Case 1
The end should be the next - 1
'10.0.0.0', '10.0.0.31'
'10.0.0.32', '10.0.0.63'

Case 2
The 




`;
