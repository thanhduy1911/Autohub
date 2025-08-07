using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer(AuctionDbContext dbContext) : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> consumeContext)
    {
        Console.WriteLine("--> Consuming AuctionFinished event");
        var auction = await dbContext.Auctions.FindAsync(Guid.Parse(consumeContext.Message.AuctionId));
        if (auction != null)
        {
            if (consumeContext.Message.ItemSold)
            {
                auction.Winner = consumeContext.Message.Winner;
                auction.SoldAmount = consumeContext.Message.Amount;
            }
            auction.Status = auction.SoldAmount > auction.ReservePrice
                ? Status.Finished
                : Status.ReserveNotMet;
        }
        
        await dbContext.SaveChangesAsync();
    }
}