import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';

@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les locations' })
  @ApiResponse({ status: 200, description: 'Liste des locations.' })
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une location par ID' })
  @ApiResponse({ status: 200, description: 'Détails de la location.' })
  @ApiResponse({ status: 404, description: 'Location introuvable.' })
  findOne(@Param('id') id: string) {
    return this.rentalsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle location' })
  @ApiResponse({ status: 201, description: 'Location créée.' })
  create(@Body() createRentalDto: CreateRentalDto) {
    return this.rentalsService.createRental(createRentalDto);
  }
}