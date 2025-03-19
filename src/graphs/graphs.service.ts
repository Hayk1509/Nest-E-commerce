import { Injectable } from '@nestjs/common';
import { CreateGraphInput } from './dto/create-graph.input';
import { UpdateGraphInput } from './dto/update-graph.input';

@Injectable()
export class GraphsService {
  create(createGraphInput: CreateGraphInput) {
    return 'This action adds a new graph';
  }

  findAll() {
    return `This action returns all graphs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} graph`;
  }

  update(id: number, updateGraphInput: UpdateGraphInput) {
    return `This action updates a #${id} graph`;
  }

  remove(id: number) {
    return `This action removes a #${id} graph`;
  }
}
