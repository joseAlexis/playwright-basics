import { Page } from "@playwright/test";
import { OrderDetailsPage } from "./Pages/OrderDetailsPage";
import { CommonElements } from "./CommonElements";
import { DashboardPage } from "./Pages/DasshboardPage";
import { CartPage } from "./Pages/CartPage";
import { CheckoutPage } from "./Pages/CheckoutPage";
import { OrderConfirmationPage } from "./Pages/OrderConfirmationPage";
import { OrdersPage } from "./Pages/OrdersPage";

export class PageObjectsManager {
  readonly commonElements;
  readonly dashboardPage;
  readonly cartPage;
  readonly checkoutPage;
  readonly orderConfirmationPage;
  readonly ordersPage;
  readonly orderDetailsPage;

  constructor(page: Page) {
    this.commonElements = new CommonElements(page);
    this.dashboardPage = new DashboardPage(page);
    this.cartPage = new CartPage(page);
    this.checkoutPage = new CheckoutPage(page);
    this.orderConfirmationPage = new OrderConfirmationPage(page);
    this.ordersPage = new OrdersPage(page);
    this.orderDetailsPage = new OrderDetailsPage(page);
  }
}
