import type {
  GamCredentials,
  CreateAdvertiserInput,
  CreateOrderInput,
  CreateLineItemInput,
  CreateCreativeInput,
  AttachCreativeInput,
  GamServiceResult,
} from './types';

/**
 * GAM API client interface. Implement with SOAP (official GAM API) or REST if available.
 * Google Ad Manager uses SOAP; see https://developers.google.com/ad-manager/api/start
 */
export interface IGamClient {
  createAdvertiser(creds: GamCredentials, input: CreateAdvertiserInput): Promise<GamServiceResult>;
  createOrder(creds: GamCredentials, input: CreateOrderInput): Promise<GamServiceResult>;
  createLineItem(creds: GamCredentials, input: CreateLineItemInput): Promise<GamServiceResult>;
  createCreative(creds: GamCredentials, input: CreateCreativeInput): Promise<GamServiceResult>;
  attachCreativeToLineItem(creds: GamCredentials, input: AttachCreativeInput): Promise<GamServiceResult>;
}

/** In-memory stub for dry run; returns fake IDs without calling GAM */
export class GamClientStub implements IGamClient {
  private counter = 0;
  private nextId(): string {
    this.counter += 1;
    return `stub_${this.counter}_${Date.now()}`;
  }

  async createAdvertiser(): Promise<GamServiceResult> {
    return { success: true, id: this.nextId() };
  }
  async createOrder(): Promise<GamServiceResult> {
    return { success: true, id: this.nextId() };
  }
  async createLineItem(): Promise<GamServiceResult> {
    return { success: true, id: this.nextId() };
  }
  async createCreative(): Promise<GamServiceResult> {
    return { success: true, id: this.nextId() };
  }
  async attachCreativeToLineItem(): Promise<GamServiceResult> {
    return { success: true };
  }
}

/**
 * Live GAM SOAP client. Wire to your SOAP implementation using credentials.
 * Example: use 'soap' package with WSDL
 * https://ads.google.com/apis/ads/publisher/v202402/LineItemService?wsdl
 */
export class GamSoapClient implements IGamClient {
  constructor(private _baseUrl?: string) {}

  async createAdvertiser(creds: GamCredentials, input: CreateAdvertiserInput): Promise<GamServiceResult> {
    // TODO: SOAP call to CompanyService.createCompanies
    return { success: false, error: 'GAM SOAP not wired; use dry run or implement SOAP calls' };
  }
  async createOrder(creds: GamCredentials, input: CreateOrderInput): Promise<GamServiceResult> {
    return { success: false, error: 'GAM SOAP not wired' };
  }
  async createLineItem(creds: GamCredentials, input: CreateLineItemInput): Promise<GamServiceResult> {
    return { success: false, error: 'GAM SOAP not wired' };
  }
  async createCreative(creds: GamCredentials, input: CreateCreativeInput): Promise<GamServiceResult> {
    return { success: false, error: 'GAM SOAP not wired' };
  }
  async attachCreativeToLineItem(creds: GamCredentials, input: AttachCreativeInput): Promise<GamServiceResult> {
    return { success: false, error: 'GAM SOAP not wired' };
  }
}
