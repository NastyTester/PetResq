using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using API.Services;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Comment Comment { get; set; }
        }
        

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private EmailService _emailService;

            public Handler(DataContext context, IUserAccessor userAccessor )
            {
                
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _emailService = new EmailService(_context, request.Comment);
                _context.Comments.Add(request.Comment);
                _emailService.SendEmail();
                var result = await _context.SaveChangesAsync() > 0;

                if(!result)
                    return Result<Unit>.Failure("Failed to create comment");

                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}