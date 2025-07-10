using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Entities;

namespace SearchService.Consumers.Auction;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        var auction = await DB.Find<Item>().OneAsync(context.Message.AuctionId);

        if (auction != null)
        {
            if (context.Message is { ItemSold: true, Amount: not null })
            {
                auction.Winner = context.Message.Winner;
                auction.SoldAmount = (int)context.Message.Amount;
            }
            auction.Status = "Finished";
            
            await auction.SaveAsync();
        }
    }
}