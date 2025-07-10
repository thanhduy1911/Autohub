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
        new()
        {
            ClientId = "postman",
            ClientName = "Postman Client",
            AllowedScopes = {"openid", "profile", "autohubApp"},
            RedirectUris = {"https://www.getpostman.com/oauth2/callback"},
            ClientSecrets = [ new Secret("NotASecret".Sha256()) ],
            AllowedGrantTypes = GrantTypes.ResourceOwnerPassword
        },
        new()
        {
            ClientId = "nextApp",
            ClientName = "NextApp Client",
            ClientSecrets = {new Secret("secret".Sha256())},
            AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
            RequirePkce = false,
            RedirectUris = {"http://localhost:3000/api/auth/callback/id-server"},
            AllowOfflineAccess = true,
            AllowedScopes = {"openid", "profile", "autohubApp"},
            AccessTokenLifetime = 3600 * 24 * 30 // too long but only for development purpose (30 days)
        }
    ];
}
