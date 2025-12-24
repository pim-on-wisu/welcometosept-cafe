using MatchaCafeAPI.Data; // 👈 1. อย่าลืม import อันนี้
using Microsoft.EntityFrameworkCore; // 👈 2. และอันนี้

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // อนุญาตเว็บ Angular ของเรา
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
    
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 👇 2. เพิ่มบรรทัดนี้ (ต้องอยู่ก่อน MapControllers)
app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

app.Run();
