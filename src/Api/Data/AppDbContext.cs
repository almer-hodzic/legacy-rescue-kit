using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Api.Data;

public class AppDbContext : IdentityDbContext<User>

{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<TaskItem>Tasks { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Roles
        var adminRole = new IdentityRole
        {
            Id = "role-admin-id",
            Name = "Admin",
            NormalizedName = "ADMIN"
        };

        var userRole = new IdentityRole
        {
            Id = "role-user-id",
            Name = "User",
            NormalizedName = "USER"
        };

        // Seed roles
        builder.Entity<IdentityRole>().HasData(adminRole, userRole);

        // Assign roles to users (based on real existing user IDs from your DB)
        builder.Entity<IdentityUserRole<string>>().HasData(
            new IdentityUserRole<string>
            {
                UserId = "0a740690-51d9-4997-a32c-c6fb3d3b7728", // Almer → Admin
                RoleId = adminRole.Id
            },
            new IdentityUserRole<string>
            {
                UserId = "db8be01e-0e92-4806-8fca-fb99889927df", // Edin → User
                RoleId = userRole.Id
            }
        );
    }

}
