import BaseApi from "./BaseApi";
import { singleton } from "tsyringe";

@singleton()
export default class WelcomeApi extends BaseApi {
	private readonly apiUrl = `${this.apiRootUrl}/welcome`;

	public async welcome(): Promise<{ value: string }> {
		return this.getRequest(this.apiUrl);
	}
}
