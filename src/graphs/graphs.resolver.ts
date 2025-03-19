import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphsService } from './graphs.service';
import { CreateGraphInput } from './dto/create-graph.input';
import { UpdateGraphInput } from './dto/update-graph.input';

@Resolver('Graph')
export class GraphsResolver {
  constructor(private readonly graphsService: GraphsService) {}

  @Mutation('createGraph')
  create(@Args('createGraphInput') createGraphInput: CreateGraphInput) {
    return this.graphsService.create(createGraphInput);
  }

  @Query('graphs')
  findAll() {
    return this.graphsService.findAll();
  }

  @Query('graph')
  findOne(@Args('id') id: number) {
    return this.graphsService.findOne(id);
  }

  @Mutation('updateGraph')
  update(@Args('updateGraphInput') updateGraphInput: UpdateGraphInput) {
    return this.graphsService.update(updateGraphInput.id, updateGraphInput);
  }

  @Mutation('removeGraph')
  remove(@Args('id') id: number) {
    return this.graphsService.remove(id);
  }
}
