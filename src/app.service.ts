import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      'https://eth-sepolia.public.blastapi.io',
    );
  }

  async getTokenData(address: string) {
    const abi = [
      'function name() view returns (string)',
      'function symbol() view returns (string)',
      'function totalSupply() view returns (uint256)',
    ];

    const contract = new ethers.Contract(address, abi, this.provider);

    const [name, symbol, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.totalSupply(),
    ]);

    return { name, symbol, totalSupply: ethers.formatUnits(totalSupply) };
  }
}
