using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Contracts;

namespace AuctionService.RequestHelpers;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // Map from Auction to Auction DTO with node Item
        CreateMap<Auction, AuctionDto>().IncludeMembers(x => x.Item);
        // Map from Item to Auction DTO
        CreateMap<Item, AuctionDto>();
        // Map from Create Auction DTO to Auction with Item will be assigned equal to Create Auction DTO
        CreateMap<CreateAuctionDto, Auction>()
            .ForMember(dest => dest.Item, opt => opt.MapFrom(source => source));
        CreateMap<CreateAuctionDto, Item>();
        CreateMap<AuctionDto, AuctionCreated>();
        CreateMap<Auction, AuctionUpdated>().IncludeMembers(x => x.Item);
        CreateMap<Item, AuctionUpdated>();
    }
}