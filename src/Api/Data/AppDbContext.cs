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

        builder.Entity<IdentityRole>().HasData(adminRole, userRole);
    }

}
