var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer(); // Required for minimal APIs.
builder.Services.AddSwaggerGen(); // Add Swagger services.

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Enable Swagger middleware.
    app.UseSwaggerUI(); // Enable the Swagger UI.
}

app.UseHttpsRedirection();

app.Run();
