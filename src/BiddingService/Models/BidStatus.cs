namespace BiddingService.Models;

public enum BidStatus
{
    Accepted,
    AcceptedBelowReservedPrice,
    TooLow,
    Finished,
}