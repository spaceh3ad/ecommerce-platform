import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { OrderManager } from "../typechain-types";
import { OrderManager__factory } from "../typechain-types";
import { BigNumber } from "ethers";

describe("OrderManager", function () {
    let orderManager: OrderManager;
    let owner: SignerWithAddress;
    let alice: SignerWithAddress;
    let bob: SignerWithAddress;

    // Set up before each test case
    beforeEach(async () => {
        [owner, alice, bob] = await ethers.getSigners();
        orderManager = await new OrderManager__factory(owner).deploy();
    });

    describe("OrderManager", function () {
        it("Should set contract admin as deployer", async function () {
            // Test that the contract admin is set as the deployer
            expect(await orderManager.admin()).to.equal(owner.address);
        });

        it("Should allow to add order", async function () {
            // Get the current order ID
            let currentOrderId = await orderManager.orderId();
            // Add an order and expect the "OrderAdded" event to be emitted with the current order ID
            await expect(addOrder()).to.emit(orderManager, "OrderAdded").withArgs(currentOrderId);
        });

        it("Should allow to retrieve orderInfo", async function () {
            // Get the current order ID
            let currentOrderId = await orderManager.orderId();
            // Add an order
            await addOrder();
            // Retrieve the order info and expect the product name to be "testOrder"
            let orderInfo = await orderManager.getOrderInfo(currentOrderId);
            expect(orderInfo.productName).to.equal("testOrder");
        })

        it("Should allow to update order if owner of order", async function () {
            // Get the current order ID
            let currentOrderId = await orderManager.orderId();
            // Add an order
            await addOrder();
            // Update the order and expect the "OrderUpdated" event to be emitted with the current order ID and status "Pending"
            await expect(updateOrder(currentOrderId)).to.emit(orderManager, "OrderUpdated").withArgs(currentOrderId, OrderStatus.Pending);
        })

        it("Should allow to update order if admin of contract", async function () {
            // Get the current order ID
            let currentOrderId = await orderManager.orderId();
            // Add an order
            await addOrder();
            // Update the order as the contract admin and expect the "OrderUpdated" event to be emitted with the current order ID and status "Pending"
            await expect(updateOrder(currentOrderId, owner)).to.emit(orderManager, "OrderUpdated").withArgs(currentOrderId, OrderStatus.Pending);
        })

        it("Should revert to update order if caller not owner of admin or admin", async function () {
            // Get the current order ID
            let currentOrderId = await orderManager.orderId();
            // Add an order
            await addOrder();
            // Try to update the order as a non-owner account and expect it to be reverted with a custom error "NotPrivilegedAccount" and the relevant arguments
            expect(updateOrder(currentOrderId, bob)).to.be.revertedWithCustomError(orderManager, "NotPrivilegedAccount").withArgs(alice.address, currentOrderId);
        })
    });

    /**
     * @dev Helper function to add an order using the specified account.
     * @param account The account to add the order from. Defaults to the "alice" account.
     * @return A promise that resolves to the transaction response.
     */
    async function addOrder(account: SignerWithAddress = alice) {
        return orderManager.connect(account).addOrder("testOrder", 1000);
    }

    /**
     * @dev Helper function to update an order using the specified order ID and account.
     * @param currentOrderId The ID of the order to update.
     * @param account The account to update the order from. Defaults to the "alice" account.
     * @return A promise that resolves to the transaction response.
     */
    async function updateOrder(currentOrderId: BigNumber, account: SignerWithAddress = alice) {
        return orderManager.connect(account).updateOrder(currentOrderId, OrderStatus.Pending);
    }

    // Enum representing the status of an order
    enum OrderStatus {
        Pending,
        Shipped,
        Accepted,
        Rejected
    }
});
