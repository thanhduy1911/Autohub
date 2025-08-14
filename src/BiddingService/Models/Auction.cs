using MongoDB.Entities;

namespace BiddingService.Models;

public class Auction : Entity
{
    public DateTime AuctionEnd { get; set; }
    public string Seller { get; set; }
    public int ReservedPrice { get; set; }
    // a flag to know an auction is finished
    public bool Finished { get; set; }
}