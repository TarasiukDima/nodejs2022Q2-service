import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistService: Repository<Artist>,
  ) {}

  create = async (createArtistDto: CreateArtistDto): Promise<Artist> => {
    const artist = await this.artistService.create(createArtistDto);

    return await this.artistService.save(artist);
  };

  findAll = async (): Promise<Array<Artist>> => {
    return await this.artistService.find();
  };

  findOne = async (id: string): Promise<Artist | null> => {
    return await this.artistService.findOneBy({ id });
  };

  update = async (
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> => {
    const artist = await this.artistService.findOneBy({ id });

    if (!artist) {
      return null;
    }

    await this.artistService.update({ id }, updateArtistDto);

    return await this.artistService.findOneBy({ id });
  };

  remove = async (id: string): Promise<DeleteResult> => {
    const artist = await this.artistService.findOneBy({ id });

    if (!artist) {
      return null;
    }

    return await this.artistService.delete({ id });
  };
}
