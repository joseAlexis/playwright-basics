import { APIRequestContext, expect, Response } from '@playwright/test';

export class APIUtils {
  protected apiContext: APIRequestContext;
  private username: string;
  private password: string;
  private headers;
  private _token;

  constructor(
    apiContext: APIRequestContext,
    username: string,
    password: string
  ) {
    this.apiContext = apiContext;
    this.username = username;
    this.password = password;

    this.headers = {
      Authorization: '',
      'content-type': 'application/json',
    };
  }

  async getNewToken() {
    const data = {
      userEmail: this.username,
      userPassword: this.password,
    };

    const response = await this.apiContext.post('/api/ecom/auth/login', {
      data,
    });

    const body = await response.json();
    this.headers.Authorization = body.token;
    return body.token;
  }

  async createOrder(country: string, productOrderedId: string) {
    const data = {
      orders: [{ country, productOrderedId }],
    };

    const response = await this.apiContext.post(
      '/api/ecom/order/create-order',
      {
        data,
        headers: this.headers,
      }
    );
    const body = await response.json();
    return body.orders[0];
  }

  public get token() {
    return this._token;
  }
}
