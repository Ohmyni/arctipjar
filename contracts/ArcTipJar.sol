// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

contract ArcTipJar {
    IERC20 public immutable usdc;

    event TipSent(
        address indexed sender,
        address indexed creator,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    constructor(address usdc_) {
        require(usdc_ != address(0), "USDC address required");
        usdc = IERC20(usdc_);
    }

    function tip(address creator, uint256 amount, string calldata message) external {
        require(creator != address(0), "Creator required");
        require(amount > 0, "Amount required");
        require(bytes(message).length <= 280, "Message too long");

        bool transferred = usdc.transferFrom(msg.sender, creator, amount);
        require(transferred, "USDC transfer failed");

        emit TipSent(msg.sender, creator, amount, message, block.timestamp);
    }
}
