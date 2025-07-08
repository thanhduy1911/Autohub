using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
    [
        new IdentityResources.OpenId(),
        new IdentityResources.Profile()
    ];

    public static IEnumerable<ApiScope> ApiScopes =>
    [
        new ApiScope("autohubApp", "Autohub API App Full Access"),
    ];

    public static IEnumerable<Client> Clients =>
    [
        // Just for development (Postman test) - Not encourage to use on production
        new Client()
        {
            ClientId = "postman",
            ClientName = "Postman Client",
            AllowedScopes = {"openid", "profile", "autohubApp"},
            RedirectUris = {"https://www.getpostman.com/oauth2/callback"},
            ClientSecrets = [ new Secret("NotASecret".Sha256()) ],
            AllowedGrantTypes = GrantTypes.ResourceOwnerPassword
        }
    ];
}
