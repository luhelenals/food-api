using api.data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString");

// Add services to the container.
builder.Services.AddEndpointsApiExplorer(); // Required for minimal APIs.
builder.Services.AddSwaggerGen(); // Add Swagger services.

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<ApplicationDBContext>(options => {
    options.UseNpgsql(connectionString);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger middleware.
    app.UseSwaggerUI(); // Enable the Swagger UI.
}

app.UseHttpsRedirection();

app.Run();
