import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ListQueryDto } from './dto/query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const entity = this.repo.create(dto);
      return await this.repo.save(entity);
    } catch (e: any) {
      if (e?.code === '23505') {
        throw new ConflictException('article must be unique');
      }
      throw e;
    }
  }

  async findAll(query: ListQueryDto) {
    const { q = '', page = 1, limit = 20, order = 'DESC' } = query;
    const where = q
      ? [
          { name: ILike(`%${q}%`) },
          { article: ILike(`%${q}%`) },
          { description: ILike(`%${q}%`) },
        ]
      : undefined;

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { id: order },
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      items,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Product not found');
    return item;
  }

  async update(id: number, dto: UpdateProductDto) {
    const preloaded = await this.repo.preload({ id, ...dto });
    if (!preloaded) throw new NotFoundException('Product not found');

    try {
      return await this.repo.save(preloaded);
    } catch (e: any) {
      if (e?.code === '23505') {
        throw new ConflictException('article must be unique');
      }
      throw e;
    }
  }

  async remove(id: number) {
    const res = await this.repo.delete(id);
    if (!res.affected) throw new NotFoundException('Product not found');
  }

  private async tryDeleteLocal(url?: string | null) {
    if (!url) return;
    const fsPath = join(
      process.cwd(),
      url.replace(
        `http://localhost:${this.config.get('APP_PORT') || 3000}`,
        '',
      ),
    );
    try {
      await unlink(fsPath);
    } catch {}
  }

  async attachPhoto(
    productId: number,
    file: Express.Multer.File,
    hostBase: string,
  ) {
    const product = await this.repo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    await this.tryDeleteLocal(product.photo_url);

    const photoUrl = `${hostBase}/uploads/products/${file.filename}`;
    product.photo_url = photoUrl;
    await this.repo.save(product);
    return { id: product.id, photo_url: product.photo_url };
  }

  async removePhoto(productId: number) {
    const product = await this.repo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    await this.tryDeleteLocal(product.photo_url);
    product.photo_url = null;
    await this.repo.save(product);
    return { id: product.id, photo_url: product.photo_url };
  }
}
