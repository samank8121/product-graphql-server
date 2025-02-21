export interface ICrudService<T, FindDto, CreateDto, UpdateDto, DeleteDto> {
  create(dto: CreateDto): Promise<T>;
  findAll(dto: FindDto): Promise<T[]>;
  update(dto: UpdateDto): Promise<T>;
  remove(dto: DeleteDto): Promise<boolean>;
}
