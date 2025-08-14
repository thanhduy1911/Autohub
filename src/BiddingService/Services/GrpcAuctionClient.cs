using AuctionService;
using BiddingService.Models;
using Grpc.Net.Client;

namespace BiddingService.Services;

public class GrpcAuctionClient(ILogger<GrpcAuctionClient> logger, IConfiguration config)
{
    public Auction GetAuction(string id)
    {
        logger.LogInformation("==> Calling gRPC Auction Service");
        var channel = GrpcChannel.ForAddress(config["GrpcAuction"] ?? string.Empty);
        var client = new GrpcAuction.GrpcAuctionClient(channel);
        var request = new GetAuctionRequest { Id = id };

        try
        {
            var reply = client.GetAuction(request);
            var auction = new Auction
            {
                ID = reply.Auction.Id,
                AuctionEnd = DateTime.Parse(reply.Auction.AuctionEnd),
                Seller = reply.Auction.Seller,
                ReservedPrice = reply.Auction.ReservePrice
            };
            
            return auction;
        }
        catch (Exception e)
        {
            logger.LogError(e, "Error getting gRPC Auction Service");
            return null;
        }
    }
}