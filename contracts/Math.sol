pragma solidity >0.8.0;

import "hardhat/console.sol";

contract Math {
	function add(int16 a, int16 b) external pure returns (int16) {
		return a + b;
	}

	function multiply(int16 a, int16 b) external pure returns (int16) {
		return a * b;
	}

	function subtract(int16 a, int16 b) external pure returns (int16) {
		return a - b;
	}

	function divide(int16 a, int16 b) external pure returns (int16) {
		return a / b;
	}

}
